import { useState } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"

export default function App() {
  const [koders, setKoders] = useState([])
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset } = useForm()


  function removeKoder(idx) {
    const kodersFiltered = koders.filter((koder, i) => i !== idx)
    setKoders(kodersFiltered)
  }

  function onSubmit(data) {

    console.log("data:", data)

    setKoders([
      ...koders, {name: data.name, lastName: data.lastName, email: data.email} //Acá dbemos agregar los demas campos de los inputs registrados
    ])
    reset()


  }
  return (

    <main className="w-full min-h-screen grid grid-cols-5 grid-rows-[3.2rem_1fr] ">

      <div className="col-start-1 col-end-6 bg-black flex justify-center">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-white text-xl font-bold">
            Koders List
          </h1>
        </div>
      </div>

      <div className="col-start-1 col-end-2 bg-gray-900 sm:col-end-3">


        <form
          className="flex flex-col gap-2 justify-center items-center h-[80%] p-5 flex-grow flex-wrap"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="gap-2 justify-center p-5 flex w-full">

            <input

              type="text"
              placeholder="Ingresa tu nombre"
              className={clsx("p-2 rounded text-black w-[60%]")}
              required
              {...register('name', {
                required: { value: true, message: "Campo nombre requerido" },
                minLength: { value: 3, message: "El nombre debe tener minimo 3 caracteres" },
                maxLength: { value: 80, message: "El nombre puede tener máximo 80 caracteres" },
              })}

            />



          </div>

          <div className="gap-2 justify-center p-5 flex w-full">

            <input

              type="text"
              placeholder="Ingresa tu Apellido"
              className={clsx("p-2 rounded text-black w-[60%]")}
              required

              {...register('lastName', {
                required: { value: true, message: "Campo Apellido requerido" },
                minLength: { value: 3, message: "El Apellido debe tener minimo 3 caracteres" },
                maxLength: { value: 50, message: " El Apellido debe tener máximo 50 caracteres" },
              })}

            />

          </div>

          <div className="gap-2 justify-center p-5 flex w-full">

            <input

              type="text"
              placeholder="Ingresa tu correo"
              className={clsx("p-2 rounded text-black w-[60%]")}
              required
              {...register('email', {
                required: { value: true, message: "Campo email requerido" },
                minLength: { value: 7, message: "El email debe tener minimo 7 caracteres" },
                maxLength: { value: 50, message: " El email debe tener máximo 50 caracteres" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Formato incorrecto de E-mail"
                }
              })}

            />

          </div>


          <button className={" text-black px-3 rounded bg-white disabled:bg-stone-400"} disabled={isSubmitted ? !isValid : false /*isSubmitted && !isValid*/}> + Agregar</button>

        </form>


        {
          errors.name && (
            <p className=" text-red-500 text-center text-sm font-bold-sm w-full">
              {errors.name?.message}
            </p>
          )
        }

        {
          errors.lastName && (
            <p className=" text-red-500 text-center text-sm font-bold-sm w-full">
              {errors.lastName?.message}
            </p>
          )
        }
        {
          errors.email && (
            <p className=" text-red-500 text-center text-sm font-bold-sm w-full">
              {errors.email?.message}
            </p>
          )
        }

      </div>


      <div className="col-start-2 col-end-6 bg-slate-800 sm:col-start-3 ">

        <div className=" flex  flex-wrap flex-row p-6 gap-3">


          {
            koders.length === 0 && <h2 className="text-black/70 text-3xl self-center pl-[40%] pt-[50%]">Sin koders 🙅‍♂️</h2>
          }

          {
            koders.map((koder, i) => {
              return (
                <>
                  <div key={`koder-${i}`} className="bg-white w-[48%] h-40 justify-evenly items-center flex flex-col rounded-md ">
                    <p className="select-none">{koder.name}</p>
                    <p className="select-none">{koder.lastName}</p>
                    <p className="select-none text-xs sm:text-sm">{koder.email}</p>
                    <br />
                    <p className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center flex" onClick={() => removeKoder(i)}> x </p>

                  </div>

                </>

              )
            })
          }


        </div>

      </div>

    </main>

  )
}