<!DOCTYPE html>
<html>
<head>
    <title>Chat Room app with laravel</title>

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    <style>
        .list-group {
            overflow-y: auto;
            height: 200px;
        }
    </style>
</head>
<body>
    <div class="container" id="app">
        <br>
        <div class="row">
            <div class="offset-3 col-md-6 offset-3" >
                <li class="list-group-item active" >Chat Room @{{ numberOfUsers }}</li>
                <div>@{{ typing }}</div>
                <ul class="list-group" v-chat-scroll>

                    <message-area v-for="message in messages" :key="message.message" :user="message.user" :time="message.time" :authuser="{{ auth()->user() }}">@{{ message.message }}</message-area>

                </ul>
                <input type="text" class="form-control" placeholder="Type your message here ..." v-model="message" @keyup.enter="send"/>
            </div>

        </div>
    </div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
