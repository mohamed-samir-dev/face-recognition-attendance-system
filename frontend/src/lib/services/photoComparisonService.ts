import { getUsers } from "./userService";
import { User } from "@/lib/types";
import { compressBase64Image } from "@/lib/utils/imageOptimizer";
import { performanceMonitor } from "@/lib/utils/performanceMonitor";

// Cache for users to avoid repeated API calls
let usersCache: User[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCachedUsers(): Promise<User[]> {
  const now = Date.now();
  if (usersCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return usersCache;
  }
  
  usersCache = await getUsers();
  cacheTimestamp = now;
  return usersCache;
}

export async function compareWithSpecificUser(capturedImageData: string, numericId: number): Promise<User | null> {
  const endTimer = performanceMonitor.startTimer('compareWithSpecificUser');
  
  try {
    console.log(`Looking for user with ID: ${numericId}`);
    const users = await getCachedUsers();
    
    // Find user by numericId
    const targetUser = users.find(user => user.numericId === numericId);
    
    if (!targetUser) {
      console.log(`User with ID ${numericId} not found`);
      return null;
    }
    
    if (!targetUser.image) {
      console.log(`User ${targetUser.name} has no photo in database`);
      return null;
    }
    
    console.log(`Comparing photo with user: ${targetUser.name}`);
    
    // Compare captured image with this specific user's photo
    const isMatch = await comparePhotos(capturedImageData, targetUser.image);
    console.log(`Photo match result: ${isMatch}`);
    
    if (isMatch) {
      console.log(`Photo verified for user: ${targetUser.name}`);
      return targetUser;
    } else {
      console.log(`Photo does not match user: ${targetUser.name}`);
      return null;
    }
    
  } catch (error) {
    console.error("Error comparing with specific user:", error);
    return null;
  } finally {
    endTimer();
  }
}

async function comparePhotos(capturedImage: string, firebaseImage: string): Promise<boolean> {
  const endTimer = performanceMonitor.startTimer('comparePhotos');
  
  try {
    console.log("Comparing photos...");
    
    // Compress images to reduce processing time
    const [compressedCaptured, compressedFirebase] = await Promise.all([
      compressBase64Image(capturedImage, 0.7),
      compressBase64Image(firebaseImage, 0.7)
    ]);
    
    // Use AbortController for timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // Reduced to 8 seconds
    
    const response = await fetch("http://localhost:5001/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image1: compressedCaptured,
        image2: compressedFirebase
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const result = await response.json();
      console.log("Photo comparison result:", result);
      return result.match === true;
    } else {
      const errorText = await response.text();
      console.log("Server error:", response.status, errorText);
      return false;
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("Photo comparison timed out");
    } else {
      console.error("Photo comparison error:", error);
    }
    return false;
  } finally {
    endTimer();
  }
}

// Clear cache when needed
export function clearUsersCache() {
  usersCache = null;
  cacheTimestamp = 0;
}

// Preload and cache user data for faster comparisons
export async function preloadUserData() {
  try {
    await getCachedUsers();
    console.log("User data preloaded and cached");
  } catch (error) {
    console.error("Failed to preload user data:", error);
  }
}

