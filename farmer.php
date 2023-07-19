<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="php.style.css">
</head>
<body>
    <div class="container">
        <?php
        if (isset($_POST["submit"])){
            $names = $_POST["names"];
            $sex=$_POST["sex"];
            $location=$_POST["location"];
            $Phone=$_POST["Phone"];
            $email = $_POST["email"];
            $product=$_POST["product"];
            
            $errors = array();
            
            if (empty($names) OR empty($sex) OR empty($location) OR empty($Phone) OR empty($email) or empty($product)) {
                array_push($errors, "All fields are required");
            }
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                array_push($errors, "Email is not Valid");
            }
            if (strlen($Phone)<10 OR strlen($Phone)>12) {
                array_push($errors, "Phone number must be at least 10 to 12 characters long");
            }

            require_once "farmersdatabase.php";
            $sql = "SELECT * FROM users WHERE email = '$email'";
            $result = mysqli_query($conn, $sql);
            $rowCount = mysqli_num_rows($result);
            if ($rowCount>0) {
                array_push($errors, "Email Already Exists !");
            }

            if (count($errors)>0) {
                foreach ($errors as $error) {
                    echo "<div class='alert alert-danger'>$error</div>";
                }
            }else {
               
                $stmt = mysqli_stmt_init($conn);
                $sql = "INSERT INTO farmers_data (names, sex, location, Phone, email, product) VALUES (?, ?, ?, ?, ?, ?)";
                if (mysqli_stmt_prepare($stmt, $sql)) {
                    mysqli_stmt_bind_param($stmt, "ssssss", $names, $sex, $location, $Phone, $email, $product);
                    mysqli_stmt_execute($stmt);
                    echo "<div class='alert alert-success'>Registration successful!</div>";
                } else {
                    echo "<div class='alert alert-danger'>Error: " . mysqli_error($conn) . "</div>";
                }
                mysqli_stmt_close($stmt);
            }
        }
        ?>
        <form action="farmer.php" method="post">
            <div class="form-group">
                <input type="text" class="form-control" name="names" placeholder="Full Name:">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="sex" placeholder="Sex:">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="location" placeholder="Location:">
            </div>
            <div class="form-group">
                <input type="number" class="form-control" name="Phone" placeholder="Phone Number:">
            </div>
            <div class="form-group">
                <input type="email" class="form-control" name="email" placeholder="Email:">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="product" placeholder="Product description:">
            </div>
            <div class="form-btn">
                <input type="submit" class="btn btn-primary" value="Register" name="submit">
            </div>
        </form>
    </div>
    <div>
        <div><p>Wants to Buy? <a href="login.php">Login Here</a></p></div>
      </div>
    
</body>
</html>