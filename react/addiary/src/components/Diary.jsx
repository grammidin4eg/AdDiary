import React from 'react';

const Diary = () => {
    return (
        <>
            <table className="table table-bordered table-hover w-100 sticky-table">
                <thead>
                <tr className="table-secondary">
                    <th scope="col" className="border-0">Число</th>
                    <th scope="col" className="border-0">Время суток</th>
                    <th scope="col" className="border-0">Время</th>
                    <th scope="col" className="border-0">SYS</th>
                    <th scope="col" className="border-0">DIA</th>
                    <th scope="col" className="border-0">Пульс</th>
                    <th scope="col" className="col-8 d-none d-sm-table-cell sticky-top2 border-0">Комментарий</th>
                </tr>
                </thead>
                <tbody>
                <tr className="table-warning">
                    <td scope="row">24 пн</td>
                    <td>Вечер</td>
                    <td>19:31</td>
                    <td>123</td>
                    <td>88</td>
                    <td>90</td>
                    <td className="d-none d-sm-table-cell">Комментарий</td>
                </tr>
                <tr className="table-danger">
                    <td scope="row">26 ср</td>
                    <td>Утро</td>
                    <td>16:13</td>
                    <td>122</td>
                    <td>90</td>
                    <td>103</td>
                    <td className="d-none d-sm-table-cell"></td>
                </tr>
                <tr className="table-success">
                    <td scope="row"></td>
                    <td></td>
                    <td>17:05</td>
                    <td>123</td>
                    <td>84</td>
                    <td>100</td>
                    <td className="d-none d-sm-table-cell"></td>
                </tr>
                <tr className="table-success">
                    <td scope="row">27 чт</td>
                    <td>Утро</td>
                    <td>12:01</td>
                    <td>121</td>
                    <td>84</td>
                    <td>93</td>
                    <td className="d-none d-sm-table-cell"></td>
                </tr>
                <tr className="table-success">
                    <td scope="row">27 чт</td>
                    <td>Утро</td>
                    <td>12:01</td>
                    <td>121</td>
                    <td>84</td>
                    <td>93</td>
                    <td className="d-none d-sm-table-cell"></td>
                </tr>
                <tr className="table-success">
                    <td scope="row">27 чт</td>
                    <td>Утро</td>
                    <td>12:01</td>
                    <td>121</td>
                    <td>84</td>
                    <td>93</td>
                    <td className="d-none d-sm-table-cell"></td>
                </tr>
                </tbody>
            </table>
            <div id="editDialog" className="modal" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Новая запись</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group col-2">
                                    <label for="inputDay">Число</label>
                                    <input type="number" className="form-control" id="inputDay"/>
                                </div>
                                <div className="form-group col-3">
                                    <label for="inputTime">Время</label>
                                    <input type="time" className="form-control" id="inputTime"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label for="inputSys">SYS</label>
                                    <input type="number" className="form-control" id="inputSys"/>
                                </div>
                                <div className="form-group col">
                                    <label for="inputDia">DIA</label>
                                    <input type="number" className="form-control" id="inputDia"/>
                                </div>
                                <div className="form-group col">
                                    <label for="inputPulse">Пульс</label>
                                    <input type="number" className="form-control" id="inputPulse"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <input type="text" className="form-control" id="inputPulse"
                                       placeholder="Комментарий (самочувствие, аритмия, лекарства, левая/правая рука)"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger">Удалить</button>
                            <div className="flex-fill"></div>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-danger" id="float-button">
                <svg width="40px" height="40px" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </button>
        </>
    );
}

export default Diary;