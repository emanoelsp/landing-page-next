<<<<<<< HEAD
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "react-hot-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema, registerSchema } from "@/app/utils/zodschema"
import { handleADD } from "@/app/utils/handlecollection"

import FormUserData from "./formUserData"
import FormAddressData from "./formAddressData"

// Combine both schemas into one
const combinedSchema = z
  .object({
    // User data
    nome: registerSchema.shape.nome,
    email: registerSchema.shape.email,
    cpf: registerSchema.shape.cpf,
    telefone: registerSchema.shape.telefone,
    login: registerSchema.shape.login,
    senha: registerSchema.shape.senha,
    confirmaSenha: registerSchema.shape.confirmaSenha,

    // Address data
    cep: addressSchema.shape.cep,
    rua: addressSchema.shape.rua,
    numero: addressSchema.shape.numero,
    bairro: addressSchema.shape.bairro,
    cidade: addressSchema.shape.cidade,
    estado: addressSchema.shape.estado,
    complemento: addressSchema.shape.complemento,
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    path: ["confirmaSenha"],
    message: "As senhas não coincidem",
  })

type CombinedFormData = z.infer<typeof combinedSchema>

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cpfMessage, setCpfMessage] = useState("")
  const [cpfIsValid, setCpfIsValid] = useState<boolean | null>(null)

  const methods = useForm<CombinedFormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      login: "",
      senha: "",
      confirmaSenha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
    },
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = methods

  const onSubmit = async (data: CombinedFormData) => {
    if (cpfIsValid === false) {
      toast.error("Por favor, insira um CPF válido.")
      return
    }

    setIsSubmitting(true)
    try {
      const formattedData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, ""),
        telefone: data.telefone ? data.telefone.replace(/\D/g, "") : "",
      }

      const result = await handleADD(formattedData)
      if (result) {
        toast.success("Registro realizado com sucesso!")
        reset()
        setCpfMessage("")
        setCpfIsValid(null)
      } else {
        toast.error("Erro ao registrar. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast.error("Erro ao registrar. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 mb-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Registrar</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* User Data Card */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Dados Pessoais</h2>
              <FormUserData
                register={register}
                errors={errors}
                control={control}
                cpfMessage={cpfMessage}
                cpfIsValid={cpfIsValid}
                setCpfMessage={setCpfMessage}
                setCpfIsValid={setCpfIsValid}
              />
            </div>

            {/* Address Data Card */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Dados de Endereço</h2>
              <FormAddressData register={register} errors={errors} control={control} setValue={setValue} />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || cpfIsValid === false}
              className="bg-gray-600 text-white p-3 px-8 rounded-lg hover:bg-gay-700 transition duration-300 disabled:bg-blue-400 w-full max-w-xs"
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
=======
'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

import { userValidation, addressValidation } from '@/app/utilities/zodvalidation';
import { handleADD } from '@/app/utilities/handleactions';
import FormUserData from './formUserData';
import FormUserAddress from './formUserAddress';

const combinedSchema = z.object({
    ...userValidation.shape,
    ...addressValidation.shape,
}).refine((data) => data.senha === data.confirmaSenha, {
    path: ['confirmaSenha'],
    message: 'As senhas não conferem',
});

type FormData = z.infer<typeof combinedSchema>;

export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cpfMessage, setCPFMessage] = useState("");
    const [cpfValid, setCPFValid] = useState(false);

    const methods = useForm<FormData>({
        resolver: zodResolver(combinedSchema),
        defaultValues: {
            nome: "", email: "", senha: "", confirmaSenha: "", cpf: "", telefone: "",
            cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: ""
        }
    });

    const { register, handleSubmit, formState: { errors }, control, setValue } = methods;

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            await handleADD(data);
            toast.success("Usuário cadastrado com sucesso!");
            methods.reset();
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            toast.error("Erro ao cadastrar usuário!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex flex-col min-h-screen justify-center items-center bg-gray-100'>
            <Toaster position="bottom-right" />
            <div className='w-full max-w-6xl mx-auto p-4 bg-white shadow-md rounded-lg'>
                <h1 className='text-4xl font-bold mb-6 text-center'>Cadastro</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='flex-1'>
                            <FormUserData 
                                register={register} 
                                errors={errors} 
                                control={control}
                                cpfMessage={cpfMessage} 
                                setCPFMessage={setCPFMessage}
                                cpfValid={cpfValid} 
                                setCPFValid={setCPFValid} 
                            />
                        </div>
                        <div className='flex-1'>
                            <FormUserAddress 
                                register={register} 
                                errors={errors} 
                                control={control} 
                                setValue={setValue} 
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            disabled={isSubmitting || cpfValid === false}
                            className={`bg-blue-900 text-white font-bold py-2 px-6 rounded-lg 
                            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
>>>>>>> f725b2acd16fb484591e34d69d551b52edf75ee6
