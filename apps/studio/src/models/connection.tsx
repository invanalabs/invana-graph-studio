

export type SupportedQueryLanguages = 'gremlin' | 'cypher'

export interface GraphDBConnection {
  id: string;
  name: string;
  queryLanguage: SupportedQueryLanguages
  hosturl: string;
  username: string | undefined;
  password: string | undefined;
}
