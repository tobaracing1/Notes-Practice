import HomePage from "@/components/home-page";
import { getActiveNotes } from "@/utils/api";

// export async function getStaticProps(){
//   const res = await fetch('https://staging-api.kurosim.com/api/general/sim-compatible-devices')
//   const data = await res.json()

//   console.log(data)
//   return {
//     props: {
//       data: data
//     }
//   }
// }

export default function Home() {
  return <HomePage />;
}
