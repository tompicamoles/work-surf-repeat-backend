import fetch from 'node-fetch';

export const generateRandomSurfImage = async (type: string): Promise<string> => {
  // Generate image URL based on name and country
  const url = `https://api.unsplash.com/photos/random?query=${type}`;
  const token = process.env.UNSPLASH_TOKEN;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    const imgUrl = data.urls.regular;
    return imgUrl;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can handle or propagate the error as needed
  }
};
