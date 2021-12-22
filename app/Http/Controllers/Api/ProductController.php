<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(){
        return Product::all();
    }

    public function store(Request $request){

        $validation = Validator::make($request->all(), 
        [ 
        'title' => 'required', 
        'description' => 'required',
        ]);

        if ($validation->fails()) {
           return response()->json($validation->errors(), 422);
        }

        if($request->title == 'rahi'){
            $validation->errors()->add('title', 'title rahi');
            return response()->json($validation->errors(), 422);
        }
        
        $product = new Product();
        $product->title = $request->title;
        $product->description = $request->description;
        $product->save();
        return response()->json(['message' => 'Product Created', 'product' => $product]);
    }
}
