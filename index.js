async function fetchUserInfo(userId) {
  console.log("--- start ---");
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(userId)}`
    );
    if (!response.ok) {
      console.error("エラーレスポンス", response);
    } else {
      const userInfo = await response.json();
      const view = escapeHTML`<h4>${userInfo.name} (@${userInfo.login})</h4>
      <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
      <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
      </dl>`;

      const result = document.getElementById("result");
      result.innerHTML = view;
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("--- end ---");
  }
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
