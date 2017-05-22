function json(response) { return response.json(); }

function blob(response) { return response.blob(); }

function text(response) { return response.text(); }

const consumers = {
  "json": json,
  "blob": blob,
  "text": text
}

export default function consume(response, type="text") { return (consumers[type] || consumers.text)(response); }
