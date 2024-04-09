import React, { useEffect } from "react";
import MenuBar from "../components/MenuBar";
import PageTitle from "../components/PageTitle";
import ChanceCard from "../components/healthAdvice/ChanceCard";
import AdviceCard from "../components/healthAdvice/AdviceCard";
import { useAPI } from "../services/APIService";
import { collection, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../services/AuthService";
import { db } from "../firebase";

function HealthAdvicePage() {
  const { ginaRecord, lc } = useAPI();
  const { currentUser } = useAuth()
  const [plan, setPlan] = React.useState("")
  const getTreatmentPlan = async () => {
    const colRef = collection(db, "users");
    const docRef = doc(colRef, currentUser.uid);
    // const docRef = doc(colRef, '4F54hrSOEsRv1nx3SGB657Nl6n22');
    const docSnap = await getDoc(docRef);
    setPlan(docSnap.data())
  }

  useEffect(() => {
    getTreatmentPlan()
  }, [])

  return (
    <div
      className="mx-auto max-w-3xl min-h-screen mobile:px-4 mobile:text-xs tablet:text-md tablet:px-20 tabletxs:px-8
      py-5 px-32 bg-gradient-to-br shadow-gray-600 bg-purple-200 items-center"
    >
      <MenuBar textColor={"text-slate-800"} />

      <PageTitle title={lc("Health Advice")} />

      <div className="flex gap-4 mt-10">
        <ChanceCard
          label={lc("Current chance of asthma exacerbation")}
          value={ginaRecord[0]?.status}
        />
        <ChanceCard
          label={lc("Previous chance of asthma exacerbation")}
          value={ginaRecord[1]?.status}
        />
      </div>
      <AdviceCard />
      <div className="mt-4 bg-white rounded-md p-2">
        <h1 className="text-xl font-bold text-center mb-3">Treatment Plan</h1>
        <p className="bg-[#f1f5f9] rounded-md p-2">{plan?.treatmentPlan}</p>
      </div>
    </div>
  );
}

export default HealthAdvicePage;
