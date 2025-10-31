export interface PythonAnalyticsReport {
  generated_at: string;
  budget_analysis: {
    variance: number;
    variance_percentage: number;
    utilization_rate: number;
  };
  salary_analysis: {
    mean_salary: number;
    median_salary: number;
    std_deviation: number;
    department_stats: Record<string, { mean: number; count: number }>;
  };
  expense_forecast: Array<{
    month: string;
    projected_amount: number;
    confidence: string;
  }>;
  insights: string[];
}

export const runPythonAnalytics = async (): Promise<PythonAnalyticsReport | null> => {
  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.warn('Python analytics failed:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error running Python analytics:', error);
    return null;
  }
};