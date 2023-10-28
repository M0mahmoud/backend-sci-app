const getUser = async (req, res) => {
  try {
    return res.json({ msg: "User Endpoint...." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};
export { getUser };
