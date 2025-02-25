<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .profile-container {
            background: white;
            width: 50%;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .profile-header {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
        }
        .profile-header img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid #1E88E5;
        }
        .profile-info {
            text-align: left;
        }
        .profile-info h2 {
            margin: 0;
            font-size: 24px;
        }
        .profile-info p {
            margin: 5px 0;
            color: gray;
        }
        .menu {
            width: 100%;
            margin-top: 20px;
        }
        .menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f9f9f9;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .menu-item:hover {
            background: #e3e3e3;
        }
        .menu-item span {
            display: flex;
            align-items: center;
            font-size: 16px;
        }
        .menu-item img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        .back-button {
            background: #1E88E5;
            color: white;
            padding: 12px 25px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            transition: background 0.3s;
        }
        .back-button:hover {
            background: #1565C0;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <div class="profile-header">
            <img src="cool_cat.png" alt="Profile Picture">
            <div class="profile-info">
                <h2>Nermine Bounite</h2>
                <p>Computer Science</p>
            </div>
        </div>
        <div class="menu">
            <div class="menu-item">
                <span><img src="cat_icon.png" alt="Favorites">List of favorites</span>
                <span>&gt;</span>
            </div>
            <div class="menu-item">
                <span><img src="cat_icon.png" alt="Events">Registered events</span>
                <span>&gt;</span>
            </div>
            <div class="menu-item">
                <span><img src="cat_icon.png" alt="Settings">...</span>
                <span>&gt;</span>
            </div>
        </div>
        <button class="back-button">Back home</button>
    </div>
</body>
</html>
