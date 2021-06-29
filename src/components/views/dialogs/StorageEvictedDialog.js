/*
Copyright 2019 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import SdkConfig from '../../../SdkConfig';
import Modal from '../../../Modal';
import { _t } from '../../../languageHandler';
import { replaceableComponent } from "../../../utils/replaceableComponent";
import BugReportDialog from "./BugReportDialog";
import BaseDialog from "./BaseDialog";
import DialogButtons from "../elements/DialogButtons";

@replaceableComponent("views.dialogs.StorageEvictedDialog")
export default class StorageEvictedDialog extends React.Component {
    static propTypes = {
        onFinished: PropTypes.func.isRequired,
    };

    _sendBugReport = ev => {
        ev.preventDefault();
        Modal.createTrackedDialog('Storage evicted', 'Send Bug Report Dialog', BugReportDialog, {});
    };

    _onSignOutClick = () => {
        this.props.onFinished(true);
    };

    render() {
        let logRequest;
        if (SdkConfig.get().bug_report_endpoint_url) {
            logRequest = _t(
                "To help us prevent this in future, please <a>send us logs</a>.",
                {},
                {
                    a: text => <a href="#" onClick={this._sendBugReport}>{text}</a>,
                },
            );
        }

        return (
            <BaseDialog className="mx_ErrorDialog" onFinished={this.props.onFinished}
                title={_t('Missing session data')}
                contentId='mx_Dialog_content'
                hasCancel={false}
            >
                <div className="mx_Dialog_content" id='mx_Dialog_content'>
                    <p>{_t(
                        "Some session data, including encrypted message keys, is " +
                        "missing. Sign out and sign in to fix this, restoring keys " +
                        "from backup.",
                    )}</p>
                    <p>{_t(
                        "Your browser likely removed this data when running low on " +
                        "disk space.",
                    )} {logRequest}</p>
                </div>
                <DialogButtons primaryButton={_t("Sign out")}
                    onPrimaryButtonClick={this._onSignOutClick}
                    focus={true}
                    hasCancel={false}
                />
            </BaseDialog>
        );
    }
}
