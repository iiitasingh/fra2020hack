import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Well from '@material-ui/icons/SentimentVerySatisfied';
import Lesswell from '@material-ui/icons/SentimentDissatisfied';
import { ResponsiveBar } from '@nivo/bar';
import teams from './taskAllocation.json';
import chartData from './Chartdata.json';



function createData(name, value) {
  return { name, value };
}

const rows = [
  createData('Current Sprint', 'Sprint 78'),
  createData('Sprint Duration (Weeks)', 8),
  createData('Sprint Start Date', '19-June-2019'),
  createData('Sprint End Date', '28-June-2019'),
  createData('Working Hours/Day', 8),
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '98%',
        margin: 'auto',
        overflowX: 'auto',
        marginTop:20
  },
  table: {
    minWidth: 700,
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const teamCount = teams.length;

  return (
    <Paper className={classes.paper}>
      <Paper className={classes.root}>
        <table className="table table-bordered" style={{ marginBottom: 0 }}>
          <thead className="thead-dark">
            <tr>
              <th colSpan={2}>Current Sprint</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td align={"center"}>{row.value}</td>
                </tr>);
            })}
          </tbody>
        </table>
      </Paper>
      <Paper className={classes.root}>
        <table className="table table-bordered" style={{ marginBottom: 0 }}>
          <thead>
            <tr className="thead-dark">
              <th colSpan={teamCount * 2}>MRIT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="thead-light" align={"center"}>
              {teams.map((team, index) => {
                return (
                  <th key={index} colSpan={2}>{team.teamName}</th>
                );
              })}
            </tr>
            <tr>
              {teams.map((team, index) => {
                return (
                  <td key={team.id} colSpan={2} style={{padding:0}}>
                    <table className="table" style={{ marginBottom: 0 }}>
                      <tbody>
                        {team.teamMembers.map((member, index1) => {
                          return (
                            <tr key={member.id}>
                              <td>{member.name}</td>
                              <td align="center"><Lesswell color="error" /></td>
                              <td align="center"><Well style={{color: '#2ca02c'}} /></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </Paper>
      <Paper className={classes.root}>
        <table className="table table-bordered" style={{ marginBottom: 0 }}>
          <thead className="thead-dark">
            <tr>
              <th colSpan={2}>Resourse progress</th>
            </tr>
          </thead>
        </table>
        <div style={{ height: 400 }}>
          <ResponsiveBar
            data={chartData}
            keys={['total', 'completed']}
            indexBy="resourse"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'category10' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Teams',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Story points',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            groupMode="grouped"
          />
        </div>
      </Paper>
    </Paper>
  );
}
