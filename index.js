async function fetchUserInfo(userId) {
  console.log("--- start ---");
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(userId)}`
    );
    console.log("レスポンスステータス:", response.status);
    if (!response.ok) {
      console.log("エラーレスポンス", response);
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("--- end ---");
  }
}
