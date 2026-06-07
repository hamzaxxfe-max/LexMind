import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081/api",
});

export async function generateContract(prompt, jurisdiction) {
  const { data } = await API.post("/generate", { prompt, jurisdiction });
  return data;
}

export function downloadPdf(prompt, jurisdiction) {
  const url = `${API.defaults.baseURL}/generate/pdf`;
  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  const promptInput = document.createElement("input");
  promptInput.name = "prompt";
  promptInput.value = prompt;
  form.appendChild(promptInput);
  const jurisInput = document.createElement("input");
  jurisInput.name = "jurisdiction";
  jurisInput.value = jurisdiction;
  form.appendChild(jurisInput);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
