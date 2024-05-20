export async function GET() {
  try {
    const response = await fetch("https://api.sampleapis.com/beers/ale");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return Response.json({ data }); // Returns an API endpoint. Reference like a URL
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
