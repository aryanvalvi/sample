// "use client"
// import {trpc} from "@/_trpc/client"
// import React, {useState, useEffect} from "react"

// const Bruhh = () => {
//   const [message, setMessage] = useState("")

//   // Fetch the hello message
//   const {data, isLoading} = trpc.hello.hello.useQuery()

//   useEffect(() => {
//     if (data) {
//       setMessage(data)
//     }
//   }, [data])

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">Test Hello</h1>
//       {isLoading ? <p>Loading...</p> : <p>{message || "No response yet"}</p>}
//     </div>
//   )
// }

// export default Bruhh
