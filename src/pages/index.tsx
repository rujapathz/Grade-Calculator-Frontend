import StepContainer from '@/components/stepContainer';

export default function Home() {
  return <StepContainer allGrades={[]} />;
}



































//------------------------------------------------------------------------

// import { useState } from 'react';

// export default function Home() {
//   const [name, setName] = useState('');
//   const [step, setStep] = useState<"name" | "score">("name");
//   const [score, setScore] = useState<number | null>(null);
//   // const [ score, setScore ] = useState('');

//   // const [error, setError] = useState<string | null>(null);
  
//   const handleNext = () => {
//     if(!name.trim()) {
//       setStep("score") ; // ถ้าผู้ใช้ไม่ใช่ชื่อ จะไม่ให้ทำไร ไม่ให้กด Next
//     }

//   }

//   // const handleBack = () => { 
//   //   // if (step > 1) setStep(step - 1);
//   // }
  
//   return (
//     <main className="container-main">
//       <div className="container-form">
//         <h1>Grade Point Average ( GPX )</h1>
//       Name
//     <input
//     className="userName"
//       id="name"
//       type="text"
//       placeholder="Enter your name"
//     />
//     <div className="form-button">
//       <button
//       className="btn-back"
//       >
//         back
//       </button>
//       <button 
//       className="btn-next" 
//       onClick={handleNext} 
//       disabled={!name.trim()} >
//         Next
//       </button>
//     </div>

//       </div>
//     </main>
//   );
// }


//-------------------------------------------------------------



// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function Home() {
//   const [name, setName] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleNext = async () => {
//     if (!name.trim()) {
//       setError('Please enter your name.');
//       return;
//     }

//     try {
//       const res = await fetch(`/api/grade/${name}`);
//       const data = await res.json();

//       if (res.ok && data?.grade) {
//         router.push(`/grade/result?name=${name}`);
//       } else {
//         router.push(`/grade/score?name=${name}`);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to check name. Try again.');
//     }
//   };

//   return (
//     <main className="container-box-main">
//       <div className="container-form">
//         <h1>Grade Point Average ( GPX )</h1>
//         <label className="Question-for-yall">Name</label>
//         <input
//           className="userName"
//           id="name"
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <div className="form-button">
//           <button
//             className="btn-next"
//             onClick={handleNext}
//             disabled={!name.trim()}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
