<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }
    public function chat()
    {
        return view('chat');
    }

    public function send(Request $request)
    {
        Chat::create(['user_id' => Auth::id(), 'message' => $request->message]);
        event(new ChatEvent($request->message, Auth::user(), $request->time));
    }

    public function chats()
    {
        return ChatResource::collection(Chat::all());
    }
}
