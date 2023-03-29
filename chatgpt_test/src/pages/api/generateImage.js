export default async function generateImage(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method === "POST") {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const prompt = req.body.prompt || "";
    const imageSize = req.body.imageSize;
    const size =
      imageSize === "small"
        ? "256x256"
        : imageSize === "medium"
        ? "512x512"
        : "1024x1024";
    if (prompt.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid prompt",
        },
      });
      return;
    }
    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: size,
      });
      const imageUrl = response.data.data[0].url;
      res.status(200).json({
        data: imageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
