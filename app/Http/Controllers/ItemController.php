<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;
class ItemController extends Controller
{
    public function manageVue()
    {
        return view('welcome');
    }
    public function getListItem(){
        $items = Item::all();

        // $response = [
        //     'pagination' => [
        //         'total' => $items->total(),
        //         'per_page' => $items->perPage(),
        //         'current_page' => $items->currentPage(),
        //         'last_page' => $items->lastPage(),
        //         'from' => $items->firstItem(),
        //         'to' => $items->lastItem()
        //     ],
           
        //     'data' => $items,
        //     'message'=>'Get list all',
        // ];


        return response()->json($items);
    }
}
