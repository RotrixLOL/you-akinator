export const getRandomWord = async () => {
  const response = await fetch(
    "https://api.api-ninjas.com/v1/randomword?type=noun",
    {
      headers: {
        "X-Api-Key": "QUEB11a1pRuvf84JhyzXDw==jl4TZUbsgmVjK4Cv",
      },
    },
  );
  return await response.json();
};
