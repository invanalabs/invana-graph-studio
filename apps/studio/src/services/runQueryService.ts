

export const fetchGraphQLData = async (query_string: string, timeout: number = 180) => {
  const url = "http://0.0.0.0:8200/graphql/";
  const query = `
    query {
      _run_query(query: "${query_string}", timeout: ${timeout}){
        data
      }
    }
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GraphQL response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};