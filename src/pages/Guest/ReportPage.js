import React, { Component } from 'react';
import {
    Navbar,
    BarChart,
    PieChart,
    LineChart,
    TabGenerator
} from "../../components/Partial";
import {
    getNumberOfContributionsReport,
    getNumberOfContributorsReport,
    getAllContributionsWithoutComment
} from "../../requests";
import {
    filterNumberOfContributionsReport,
    filterNumberOfContributorsReport,
    filterPercentageOfContributionsReport
} from "../../utils";
import {
    ContributionTable
} from "../../components/Contribution";
import {
    Skeleton
} from "antd";

class ReportPage extends Component {

    state = {
        filteredNumberOfContributionsReportData: [],
        termsLabel: [],
        filteredNumberOfContributorsReportData: [],
        termsLabelContributor: [],
        filteredPercentageOfContributionsReport: [],
        termsLabelPercentage: [],
        contributionsWithoutComment: [],
        loading: true
    }

    async componentDidMount() {
        const numberOfContributionsReportData = await getNumberOfContributionsReport();
        const numberOfContributorsReportData = await getNumberOfContributorsReport();
        const getAllContributionsWithoutCommentData = await getAllContributionsWithoutComment();
        const filteredNumberOfContributionsReportData = filterNumberOfContributionsReport(numberOfContributionsReportData.data);
        const filteredNumberOfContributorsReportData = filterNumberOfContributorsReport(numberOfContributorsReportData.data);
        const filteredPercentageOfContributionsReportData = filterPercentageOfContributionsReport(numberOfContributionsReportData.data);
        this.setState({
            filteredNumberOfContributionsReportData,
            termsLabel: numberOfContributionsReportData.data.terms,
            filteredNumberOfContributorsReportData,
            termsLabelContributor: numberOfContributorsReportData.data.terms,
            filteredPercentageOfContributionsReportData,
            contributionsWithoutComment: getAllContributionsWithoutCommentData.data,
            loading: false
        })
    }

    renderMasterTabGen = () => {
        const {
            filteredNumberOfContributionsReportData, 
            termsLabel,
            filteredNumberOfContributorsReportData,
            termsLabelContributor,
            contributionsWithoutComment
        } = this.state;
        const {
            renderTabGen
        } = this;

        const contributionsWithoutCommentAfter14Days = contributionsWithoutComment.filter(contributionsWithoutCommentItem => {
            const timeNow = new Date();
            const timeContributed = new Date(contributionsWithoutCommentItem.created_date);
            // To calculate the time difference of two dates 
            const Difference_In_Time = timeNow.getTime() - timeContributed.getTime(); 
            
            // To calculate the no. of days between two dates 
            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

            if (Difference_In_Days >= 14) {
                return true;
            }

            return false;
        })

        const tabContents = [
            <>
                <div className="chart-item">
                    <BarChart data={filteredNumberOfContributionsReportData}
                    labels={termsLabel}
                    title={`Number of Contributions`}
                    />
                </div>
                <div className="chart-item">
                    <LineChart data={filteredNumberOfContributorsReportData}
                    labels={termsLabelContributor}
                    title={`Number of Contributors`}
                    />
                </div>
                <div className="chart-item">
                    {renderTabGen()}
                </div>
            </>,
            <>
                <div className="chart-item">
                    <h4>Contributions without Comment</h4>
                    <ContributionTable contributions={contributionsWithoutComment}/>  
                </div>
                <div className="chart-item">
                    <h4>Contributions without Comment after 14 Days</h4>
                    <ContributionTable contributions={contributionsWithoutCommentAfter14Days}/>  
                </div>
            </>
        ]

        const tabHeaders = ["Statistics", "Exception Reports"];

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    renderTabGen = () => {
        const {termsLabel, filteredPercentageOfContributionsReportData} = this.state;

        const tabContents = filteredPercentageOfContributionsReportData.map((filteredPercentageOfContributionsReportDataItem, index) => {
            const {randomLabels} = filteredPercentageOfContributionsReportDataItem;
            console.log(filteredPercentageOfContributionsReportDataItem);
            return <PieChart labels={randomLabels} data={[filteredPercentageOfContributionsReportDataItem]} title={`Percentage of Contributions of ${termsLabel[index]}`}/>
        })

        const tabHeaders = termsLabel;

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    render() {
        const {
            loading
        } = this.state;
        const {
            renderMasterTabGen
        } = this;

        if (loading) {
            return (
                <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </div>
                </main>
            </div>
            )

        }

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        {renderMasterTabGen()}
                    </div>
                </main>
            </div>
        )
    }
}

export default ReportPage;
