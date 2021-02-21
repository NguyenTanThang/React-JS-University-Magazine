import {random_rgba} from "./";

export const filterNumberOfContributionsReport = (data) => {
    const {contributions, terms, faculties} = data;
    let datasets = [];

    for (let i = 0; i < faculties.length; i++) {
        const faculty = faculties[i];
        const randomColor = random_rgba();
        console.log(randomColor);
        const {
            bgColor,
            borderColor
        } = randomColor;
        let dataset = {
            label: faculty,
            data: [],
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: 1,
        }
        datasets.push(dataset);
    }
    
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let selectedContributions = contributions.filter(contribution => {
            return contribution.term.name === term;
        });
        for (let z = 0; z < faculties.length; z++) {
            let dataCount = 0;
            const faculty = faculties[z];
            for (let j = 0; j < selectedContributions.length; j++) {
                const selectedContribution = selectedContributions[j];
                console.log(selectedContribution.faculty.name);
                console.log(faculty);
                if (selectedContribution.faculty.name === faculty) {
                    dataCount += selectedContribution.count;
                }            
            }
            datasets.map(dataset => {
                if (dataset.label === faculty) {
                    dataset.data = [...dataset.data, dataCount];
                }
                return dataset;
            })
        }
    }

    return datasets;
}

export const filterNumberOfContributorsReport = (data) => {
    const {contributions, terms} = data;
    const contributors = contributions;
    let datasets = [];
    let dataset = {};
    const randomColor = random_rgba();
        const {
            bgColor,
            borderColor
        } = randomColor;
    dataset = {
        label: "Number of Contributors",
        data: [],
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1,
    }
    
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let selectedContributor = contributors.filter(contribution => {
            return contribution.term.name === term;
        })[0];
        dataset.data = [...dataset.data, selectedContributor.contributorCount];
    }

    datasets.push(dataset);

    return datasets;
}

export const filterPercentageOfContributionsReport = (data) => {
    const {contributions, terms, faculties} = data;
    let datasets = [];

    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let selectedContributions = contributions.filter(contribution => {
            return contribution.term.name === term;
        });

        let dataset = {};
        dataset = {
            label: "Percentage of Contributions",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            randomLabels: []
        }

        for (let k = 0; k < selectedContributions.length; k++) {
            const selectedContribution = selectedContributions[k];
            let filteredFaculties = faculties.filter(faculty => {
                return faculty === selectedContribution.faculty.name;
            })[0];
            dataset.randomLabels = [...dataset.randomLabels, filteredFaculties];
            dataset.data = [...dataset.data, selectedContribution.percentage];
            const randomColor = random_rgba();
        const {
            bgColor,
            borderColor
        } = randomColor;
            dataset.backgroundColor = [...dataset.backgroundColor, bgColor];
            dataset.borderColor = [...dataset.borderColor, borderColor];
        }
        
        datasets.push(dataset);
    }

    return datasets;
}
