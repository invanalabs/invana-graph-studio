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


// Base service class for localStorage
// Base service class for localStorage
export class LocalStorageServiceBase<T> {
  constructor(private storageKey: string) { }

  protected getItems(): Promise<T[]> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(this.storageKey);
      resolve(data ? JSON.parse(data) : []);
    });
  }

  protected saveItems(items: T[]): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      resolve();
    });
  }

  create(item: T): Promise<T> {
    return this.getItems().then((items) => {
      items.push(item);
      return this.saveItems(items).then(() => item); // Return the newly created item
    });
  }

  read(id: string): Promise<T | null> {
    return this.getItems().then((items) => {
      return items.find((item: any) => item.id === id) || null;
    });
  }

  readAll(): Promise<T[]> {
    return this.getItems();
  }

  update(id: string, updatedItem: T): Promise<void> {
    return this.getItems().then((items) => {
      const index = items.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        return this.saveItems(items);
      }
    });
  }

  delete(id: string): Promise<void> {
    return this.getItems().then((items) => {
      const filteredItems = items.filter((item: any) => item.id !== id);
      return this.saveItems(filteredItems);
    });
  }
}

