<!DOCTYPE html>
<html>
<head>
    <title>Bookings</title>
</head>
<body>
    <h1>Bookings</h1>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Hotel Name</th>
                <th>Room Number</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($bookings as $booking)
                <tr>
                    <td>{{ $booking->id }}</td>
                    <td>{{ $booking->start_date }}</td>
                    <td>{{ $booking->end_date }}</td>
                    <td>{{ optional($booking->room->hotel)->name }}</td>
                    <td>{{ optional($booking->room)->room_number }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>