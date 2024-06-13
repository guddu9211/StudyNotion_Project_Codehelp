# Steps to make it up and running at your end.
[ Pre-requisite: nodejs, VSCode, mongodb, cloudinary account, razorpay account ]
1. Clone this repo to your local machine and get inside that directory
2. Create a .env file in both SOURCE and current directories (just directly inside these directories i.e. SOURCE/.env and .env { parallel to src directory } )
3. In the .env file of current(root) directory, add 1 parameter only i.e. your localhost path as
       REACT_APP_BASE_URL=http://localhost:3000/api/v1
4. In the .env file of SOURCE directory collect and add these fields from your personal accounts:
    MONGODB_URL=mongodb://<mongo_db_url>/StudyNotion

    MAIL_HOST=smtp.gmail.com
    MAIL_USER=<your_email_address>
    MAIL_PASS=<your_16digit_secret_passcode_without_spaces>
    
    JWT_SECRET=<your_jwt_secret_for_encryption>
    PORT=4000<any_valid_port_number>
    
    RAZORPAY_KEY = <rzpay_key>
    RAZORPAY_SECRET = <rzpay_secret>
    WEBHOOK_SECRET=<webhook_secret>
    
    
    CLOUD_NAME=<cloudinary_cloud_name>
    API_KEY=<cloudinary_api_key>
    API_SECRET=<cloudinary_api_secret>
    FOLDER_NAME=<cloudinary_directory>

5. Save the changes and install all NPM modules
   npm init

6. In package.json you can observe that we are concurrently running Client and Server modules at the same host, so you can start it using our configured command as:
   npm run dev
