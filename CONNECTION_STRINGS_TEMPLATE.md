# Database Connection Strings Template

Fill in the connection strings after creating each database. Once completed, share this file and I'll configure the environment variables.

---

## PostgreSQL (Render)

### Detailed Steps to Create:

1. **Log in to Render Dashboard**
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account

2. **Navigate to Create New Service**
   - In the top-right corner, click the **"New +"** button
   - A dropdown menu will appear

3. **Select PostgreSQL**
   - From the dropdown, click **"PostgreSQL"**
   - This will open the PostgreSQL database creation page

4. **Configure PostgreSQL Database**
   - **Name**: Enter `blinkit-postgres`
   - **Database**: Enter `discovery_engine`
   - **User**: Enter `postgres` (or create a custom username)
   - **Region**: Select `Oregon (US West)` (or closest to your location)
   - **Plan**: Keep as `Free` (default)
   - Leave other settings as default

5. **Create the Database**
   - Click the **"Create Database"** button at the bottom
   - Wait 2-3 minutes for the database to be provisioned
   - You'll see a spinner while it's being created

6. **Copy the Connection String**
   - Once created, you'll be redirected to the PostgreSQL database dashboard
   - Look for the **"Connections"** section (usually on the right side)
   - Find the **"Internal Database URL"** field
   - Click the **"Copy"** button next to it
   - The URL will look like: `postgresql://postgres:YOUR_PASSWORD@dpg-xxxxx.oregon-postgres.render.com:5432/discovery_engine`

7. **Paste the Connection String**
   - Paste the copied URL below in the "Your Connection String" section

### Connection String Format:
```
postgresql://postgres:YOUR_PASSWORD@dpg-xxxxx.oregon-postgres.render.com:5432/discovery_engine
```

### Your Connection String:
```
[postgresql://topfellow:sUGCiccIMkgLCVDdGjVXH8UySx4FuWke@dpg-d9guljepbkes73cbj9f0-a/discovery_engine]
```

---

## MongoDB Atlas

### Detailed Steps to Create:

1. **Log in to MongoDB Atlas**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign in or create a free account

2. **Build a New Database**
   - Click the **"Build a Database"** button (green button on the dashboard)
   - This will open the cluster creation wizard

3. **Select Free Tier**
   - Choose **"M0 Sandbox"** (free tier)
   - This gives you 512MB storage
   - Click **"Create"**

4. **Configure Cluster**
   - **Cloud Provider**: Select `AWS`
   - **Region**: Select `us-east-1` (or closest to your location)
   - **Cluster Name**: Enter `blinkit-cluster` (or keep default)
   - Click **"Create Cluster"**
   - Wait 2-3 minutes for the cluster to be provisioned

5. **Create Database User**
   - Once cluster is ready, click **"Database Access"** in the left sidebar
   - Click **"Create New Database User"**
   - **Authentication Method**: Select `Password`
   - **Username**: Enter `blinkit_admin`
   - **Password**: Generate a strong password (save this securely)
   - **Database User Privileges**: Select `Read and write to any database`
   - Click **"Create User"**

6. **Configure Network Access**
   - Click **"Network Access"** in the left sidebar
   - Click **"Add IP Address"**
   - Select **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - This is required for Render to access your database
   - Click **"Confirm"**

7. **Get Connection String**
   - Go back to your cluster dashboard
   - Click **"Connect"** button
   - Select **"Connect your application"**
   - **Driver**: Select `Node.js` (or your preferred driver)
   - **Version**: Select latest version
   - Copy the connection string
   - Replace `<password>` with your actual database user password

8. **Paste the Connection String**
   - Paste the connection string below in the "Your Connection String" section
   - Make sure to replace `<db_username>` and `<db_password>` with actual values

### Connection String Format:
```
mongodb+srv://blinkit_admin:YOUR_PASSWORD@blinkit-cluster.xxxxx.mongodb.net/discovery_engine
```

### Your Connection String:
```
[mongodb+srv://blinkit_admin:Z#if3uRQk_KH#9U>@cluster0.t9ajn7r.mongodb.net/?appName=Cluster0]
```

---

## Redis (Render)

### Detailed Steps to Create:

1. **Log in to Render Dashboard**
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account

2. **Navigate to Create New Service**
   - In the top-right corner, click the **"New +"** button
   - A dropdown menu will appear

3. **Select Redis**
   - From the dropdown, click **"Redis"**
   - This will open the Redis instance creation page

4. **Configure Redis Instance**
   - **Name**: Enter `blinkit-redis`
   - **Region**: Select `Oregon (US West)` (or the same region as your PostgreSQL for best performance)
   - **Plan**: Keep as `Free` (default)
   - Leave other settings as default

5. **Create the Instance**
   - Click the **"Create Redis Instance"** button at the bottom
   - Wait 2-3 minutes for the instance to be provisioned
   - You'll see a spinner while it's being created

6. **Copy the Connection String**
   - Once created, you'll be redirected to the Redis instance dashboard
   - Look for the **"Connections"** section (usually on the right side)
   - Find the **"Internal Redis URL"** field
   - Click the **"Copy"** button next to it
   - The URL will look like: `rediss://red-xxxxx:YOUR_PASSWORD@oregon-0.render.com:6379`

7. **Paste the Connection String**
   - Paste the copied URL below in the "Your Connection String" section

### Connection String Format:
```
rediss://red-xxxxx:YOUR_PASSWORD@oregon-0.render.com:6379
```

### Your Connection String:
```
redis://red-d9gv21g4n6ts739ti1d0:6379
```

---

## After Collecting All Connection Strings

Once you have all three connection strings, share them with me and I will:
1. Create the `.env.production` files
2. Update the Render configuration
3. Configure the environment variables for deployment

---

## Security Notes

- **Never commit actual connection strings to git**
- **Keep passwords secure**
- **Use strong, unique passwords for each database**
- **Connection strings will be stored in environment files that are gitignored**
