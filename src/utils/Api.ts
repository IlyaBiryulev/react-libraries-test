const UPLOAD = 'http://localhost:5000/upload';

export async function postFile(data: any) {
  try {
    const response = fetch(UPLOAD, {
      method: 'POST',
      body: data
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}