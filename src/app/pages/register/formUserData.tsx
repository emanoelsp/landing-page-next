<<<<<<< HEAD
"use client"
import { type Control, Controller, type FieldErrors, type UseFormRegister } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { handleCpfVerify } from "@/app/utils/apivalidacpf"

type FormUserDataProps = {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  control: Control<any>
  cpfMessage: string
  cpfIsValid: boolean | null
  setCpfMessage: (message: string) => void
  setCpfIsValid: (isValid: boolean | null) => void
}

export default function FormUserData({
  register,
  errors,
  control,
  cpfMessage,
  cpfIsValid,
  setCpfMessage,
  setCpfIsValid,
}: FormUserDataProps) {
  const handleCpfBlur = async (value: string) => {
    if (value && value.length === 14) {
      // Com máscara: 000.000.000-00
      const result = await handleCpfVerify(value)
      setCpfMessage(result)
      setCpfIsValid(result === "CPF válido.")
    } else {
      setCpfMessage("")
      setCpfIsValid(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <input
          type="text"
          {...register("nome")}
          placeholder="Nome"
          className={`p-2 border ${errors.nome ? "border-red-500" : "border-gray-300"} rounded-lg w-full`}
        />
        {errors.nome && <span className="text-red-500 text-sm block">{String(errors.nome.message)}</span>}
      </div>

      <div className="space-y-1">
        <input
          type="text"
          {...register("email")}
          placeholder="Email"
          className={`p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg w-full`}
        />
        {errors.email && <span className="text-red-500 text-sm block">{String(errors.email.message)}</span>}
      </div>

      <div className="space-y-1">
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <IMaskInput
              mask="000.000.000-00"
              value={field.value}
              onAccept={(value) => field.onChange(value)}
              onBlur={() => handleCpfBlur(field.value)}
              placeholder="CPF"
              className={`p-2 border ${
                errors.cpf
                  ? "border-red-500"
                  : cpfIsValid === true
                    ? "border-green-500"
                    : cpfIsValid === false
                      ? "border-red-500"
                      : "border-gray-300"
              } rounded-lg w-full`}
            />
          )}
        />
        {errors.cpf && <span className="text-red-500 text-sm block">{String(errors.cpf.message)}</span>}
        {cpfMessage && !errors.cpf && (
          <span
            className={`text-sm block p-2 rounded mt-1 ${
              cpfIsValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {cpfMessage}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <IMaskInput
              mask="(00) 00000-0000"
              value={field.value}
              onAccept={(value) => field.onChange(value)}
              placeholder="Telefone"
              className={`p-2 border ${errors.telefone ? "border-red-500" : "border-gray-300"} rounded-lg w-full`}
            />
          )}
        />
        {errors.telefone && <span className="text-red-500 text-sm block">{String(errors.telefone.message)}</span>}
      </div>

      <div className="space-y-1">
        <input
          type="text"
          {...register("login")}
          placeholder="Login"
          className={`p-2 border ${errors.login ? "border-red-500" : "border-gray-300"} rounded-lg w-full`}
        />
        {errors.login && <span className="text-red-500 text-sm block">{String(errors.login.message)}</span>}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          {...register("senha")}
          placeholder="Senha"
          className={`p-2 border ${errors.senha ? "border-red-500" : "border-gray-300"} rounded-lg w-full`}
        />
        {errors.senha && <span className="text-red-500 text-sm block">{String(errors.senha.message)}</span>}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          {...register("confirmaSenha")}
          placeholder="Confirmar Senha"
          className={`p-2 border ${errors.confirmaSenha ? "border-red-500" : "border-gray-300"} rounded-lg w-full`}
        />
        {errors.confirmaSenha && <span className="text-red-500 text-sm block">{String(errors.confirmaSenha.message)}</span>}
      </div>
    </div>
  )
}
=======
import { IMaskInput } from 'react-imask';
import { Control, Controller, Field, FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

import { validateCPF } from '@/app/utilities/apivalidacpf';
import { register } from 'module';
import toast from 'react-hot-toast';

type FormUserData = {
    register: UseFormRegister<any>,
    errors: FieldErrors<any>,
    control: Control<any>,
    cpfMessage: string, setCPFMessage: (message: string) => void,
    cpfValid: boolean, setCPFValid: (valid: boolean) => void,
};

export default function FormUserData({ register, errors, control, cpfMessage, setCPFMessage,
    cpfValid, setCPFValid }: FormUserData) {

    const cpfBlur = async (value: string) => {
        const result = await validateCPF(value);
        setCPFValid(result);
        if (result) {
            setCPFMessage("CPF válido!");
        } else {
            setCPFMessage("CPF inválido!");
        }
    }
    return (
        <div className='container py-12 px-4 items-center'>
            <h1 className='text-4xl font-bold mb-6 text-center'>Dados Pessoais </h1>
            <input type="text" placeholder='Nome' {...register("nome")}
                className='border-2 border-blue-900 rounded-lg p-2 mt-2 w-full' />
            {errors.nome && <span className='text-red-500'>{String(errors.nome.message)}</span>}
            <input type="text" placeholder='Email' {...register("email")}
                className='border-2 border-blue-900 rounded-lg p-2 mt-2 w-full' />
            {errors.email && <span className='text-red-500'>{String(errors.email.message)}</span>}
            <input type="password" placeholder='Senha' {...register("senha")}
                className='border-2 border-blue-900 rounded-lg p-2 mt-2 w-full' />
            {errors.senha && <span className='text-red-500'>{String(errors.senha.message)}</span>}
            <input type="password" placeholder='Confirme a senha' {...register("confirmaSenha")}
                className='border-2 border-blue-900 rounded-lg p-2 mt-2 w-full' />
            {errors.confirmaSenha && <span className='text-red-500'>{String(errors.confirmaSenha.message)}</span>}
            <Controller name="cpf" control={control}
                render={({ field }) => (
                    <IMaskInput
                        value={field.value} mask="000.000.000-00" placeholder='CPF'
                        className={`border-2 ${errors.cpf ? "border-red-500" :  
                                cpfValid === true ? "border-green-500" : 
                                cpfValid === false ? "border-red-500" : 
                                "border-blue-900"} 
                                rounded-lg p-2 mt-2 w-full`}
                        onChange={(e: any) => { field.onChange(e.target.value) }}
                        onBlur={() => { cpfBlur(field.value) }}
                        onAccept={(value: string) => { field.onChange(value) }}
                    />
                )}
            />
            {errors.cpf && <span className='text-red-500'>{String(errors.cpf.message)}</span>}
            <Controller name="telefone" control={control}
                render={({ field }) => (
                    <IMaskInput
                        value={field.value} mask="(00) 00000-0000" placeholder='Telefone'
                        className='border-2 border-blue-900 rounded-lg p-2 mt-2 w-full'
                        onAccept={(value: string) => { field.onChange(value) }}
                    />
                )}
            />
            {errors.telefone && <span className='text-red-500'>{String(errors.telefone.message)}</span>}
        </div>
    );
}
>>>>>>> f725b2acd16fb484591e34d69d551b52edf75ee6
