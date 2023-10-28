import { connect } from "mongoose";

async function connectDB() {
  try {
    await connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("MongoDB Error", error);
  }
}
export default connectDB;
