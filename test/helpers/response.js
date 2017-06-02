export function text() { return {text: function() { return 'content'; }}; }
export function blob() { return {blob: function() { return 'blob' }}; }
export function json() { return {json: function() { return {content: "content"} }}; }
