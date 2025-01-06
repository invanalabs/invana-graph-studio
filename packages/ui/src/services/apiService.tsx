// Base service class for API
export abstract class APIServiceBase<T> {
  protected apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  protected async request(
    query: string,
    variables: Record<string, any> = {}
  ): Promise<T> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors.map((err: any) => err.message).join(', '));
      }

      return result.data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
}

