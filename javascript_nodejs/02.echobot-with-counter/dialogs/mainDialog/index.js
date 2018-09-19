// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Turn counter property
const TURN_COUNTER = 'turnCounter';

class MainDialog {
     /**
     * 
     * @param {ConversationState} conversation state object
     */
    constructor (conversationState) {
        // creates a new state accessor property.see https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors 
        this.countProperty = conversationState.createProperty(TURN_COUNTER);
        this.conversationState = conversationState;
    }
    /**
     * 
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === 'message') {
            // read from state.
            let count = await this.countProperty.get(turnContext);
            count = count === undefined ? 1 : count;
            await turnContext.sendActivity(`${count}: You said "${turnContext.activity.text}"`);
            // increment and set turn counter.
            this.countProperty.set(turnContext, ++count);
        }
        else {
            await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
        }
        // Save state changes
        await this.conversationState.saveChanges(turnContext);
    }
}

module.exports.MainDialog = MainDialog;