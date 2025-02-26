import { Patient, Staf, Symton, TriaseCheck } from "./Partials";

const DetaiTriage = ({ data }) => {
    console.log(data);

    return (
        <div className="pt-5 flex flex-col gap-5">
            <Patient data={data} />
            <Symton data={data} />
            <TriaseCheck data={data?.triage_checklists} />
            <Staf data={data?.user} />
        </div>
    );
};

export default DetaiTriage;
