import { IssuesListResponseSchema } from "@/api/routes/list-issues";

const API_URL = "http://localhost:3000/api";

export async function listIssues() {
  const response = await fetch(`${API_URL}/issues`);
  const data = await response.json();

  return IssuesListResponseSchema.parse(data);
}
