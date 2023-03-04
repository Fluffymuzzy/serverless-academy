export async function getData(endpoint) {
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.isDone !== undefined) {
        console.log(`[Success] ${endpoint}: isDone - ${data.isDone}`);
        return data.isDone;
      }
      throw new Error(`Response did not contain isDone key: ${endpoint}`);
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
        return undefined;
      }
    }
  }
}
