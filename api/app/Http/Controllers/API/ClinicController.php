<?php

namespace App\Http\Controllers\API;
use App\Clinic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class ClinicController extends Controller
{
    public function index(Request $request)
    {
        $query = Clinic::with(['regional', 'specialties']);

        if ($request->has('search')) {
            $query->where('nome_fantasia', 'like', '%' . $request->search . '%')
                  ->orWhere('razao_social', 'like', '%' . $request->search . '%');
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'razao_social' => 'required|string|max:255',
            'nome_fantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|unique:clinics|max:18',
            'regional_id' => 'required|exists:regionals,id',
            'data_inauguracao' => 'required|date',
            'specialties' => 'required|array|min:1',
            'specialties.*' => 'exists:specialties,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $clinic = Clinic::create($request->except('specialties'));
        $clinic->specialties()->sync($request->specialties);

        return response()->json($clinic->load(['regional', 'specialties']), 201);
    }

    public function show(Clinic $clinic)
    {
        return $clinic->load(['regional', 'specialties']);
    }

    public function update(Request $request, Clinic $clinic)
    {
        $clinic->update($request->except('specialties'));

        if ($request->has('specialties')) {
            $clinic->specialties()->sync($request->specialties);
        }

        return response()->json($clinic->load(['regional', 'specialties']), 200);
    }

    public function destroy(Clinic $clinic)
    {
        $clinic->delete();
        return response()->json(null, 204);
    }
}
