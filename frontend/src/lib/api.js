import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
});

export async function generateContract(prompt, jurisdiction) {
  const { data } = await API.post("/generate", { prompt, jurisdiction });
  return data;
}

export async function downloadPdf(prompt, jurisdiction) {
  const { data } = await API.post("/generate/pdf", { prompt, jurisdiction }, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "contract.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
