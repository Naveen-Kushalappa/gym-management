<!DOCTYPE html>
<html lang="en">
    <head>
         <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('gym-mgmt-logo.png') }}">

    </head>
    <body> 
        <nav class="navbar navbar-dark  mb-3">

            <div class="container">
                <a class="navbar-brand" href="{{ route('members.index') }}">Gym Management</a>
            </div>

            <div class="container">
                @yield('content')
            </div>

        </nav>
    </body>
</html>
