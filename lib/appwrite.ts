import { Client, Account, Databases } from "appwrite"

// Create a single client instance
const client = new Client()

// Initialize the client
try {
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67bc0ec7003432c7a3a4")
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error)
}

// Create service instances
export const account = new Account(client)
export const databases = new Databases(client)

// Database and collection IDs
export const DATABASE_ID = "67bc0eec00344f8475a5"
export const USERS_COLLECTION_ID = "67bf2a84000a8dfecae2"
export const PRODUCTS_COLLECTION_ID = "67bc12a400187f080f74"
export const ORDERS_COLLECTION_ID = "67bc1c890023743c38d0"

export { client }

