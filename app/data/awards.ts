export interface Award {
    title: string;
    issuer?: string;
    date?: string;
    teamName?: string;
    image?: string;
}

export const AWARDS: Award[] = [
    {
        title: "Winner at Devkraft Hackathon",
        issuer: "DR.D.Y.PATILINSTITUTEOF TECHNOLOGY, PIMPRI PUNE",
        date: "Aug 2025",
        teamName: "Bluelock",
        image: ""
    },
    {
        title: "Winner at CodeWars",
        issuer: "JSPM NTC Pune",
        date: "Mar 2025",
        teamName: "Debug Demons",
        image: ""
    },
    {
        title: "Winner at Synapse 2.0 ML Hackathon",
        issuer: "MKSSS's Cummins College of Engineering for women",
        date: "Mar 2025",
        teamName: "Spartans",
        image: ""
    },
    {
        title: "Winner at L&T NeuroHack",
        issuer: "COEP Technical University",
        date: "",
        teamName: "CodeAce",
        image: ""
    },
    {
        title: "First Prize - Hackathon",
        issuer: "Dr. J.J. Magdum College of Engineering, Jaysingpur",
        date: "",
        teamName: "Dream Developer",
        image: ""
    },
    {
        title: "First Prize - Interview Competition",
        issuer: "Government Polytechnic, Kolhapur",
        teamName: "Dream Developer",
    },
    {
        title: "First Prize - Web Development Competition",
        issuer: "Government Polytechnic, Kolhapur",
        teamName: "Dream Developer",
    },
    {
        title: "Runner-Up - Shark Tank Project Idea Competition",
        issuer: "Sanjeevan Engineering and Technology Institute, Panhala",
        teamName: "Debug Demons",
    }
];

