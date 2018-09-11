import React from 'react';
import { Button } from 'reactstrap';
import { ExcelExport, ExcelExportColumn} from '@progress/kendo-react-excel-export';
class ExportToExcel extends React.Component {
    _export;
    export = () => {
        this._export.save();
    }
    render() {
        return (
            <div align="center">
                <ExcelExport fileName="WallySkillsReport.xlsx" creator="Dayashri"
                    data={this.props.employeeSkills}
                    ref={(exporter) => { this._export = exporter; }}
                >
                    <ExcelExportColumn field="fName" title="First Name" width={300} />
                    <ExcelExportColumn field="lName" title="Last Name"  width={300}/>
                    <ExcelExportColumn field="employeeId" title="Employee Id"  width={300}/>
                    <ExcelExportColumn field="skill1" title="Skill Set #1"  width={300}/>
                    <ExcelExportColumn field="skill2" title="Skill Set #2"  width={300}/>
                </ExcelExport>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button color="success" onClick={this.export}>Export Submitted Data</Button>
                </div>
        );
    }
}
export default ExportToExcel;