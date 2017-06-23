import {
    metadata,
    DATABASE_ID,
    ORDERS_TABLE_ID,
    orders_raw_card
} from "metabase/__support__/sample_dataset_fixture";

import Question from "./Question";

describe("Mode", () => {
    const rawDataQuestionMode = new Question(metadata, orders_raw_card).mode();
    const timeBreakoutQuestionMode = Question.create({
        databaseId: DATABASE_ID,
        tableId: ORDERS_TABLE_ID,
        metadata
    })
        .query()
        .addAggregation(["count"])
        .addBreakout(["datetime-field", ["field-id", 1], "day"])
        .question()
        .setDisplay("table")
        .mode();

    describe("forQuestion(question)", () => {
        it("with structured query question", () => {
            // testbed for generative testing? see http://leebyron.com/testcheck-js

            it("returns `segment` mode with raw data", () => {});

            it("returns `metric` mode with >= 1 aggregations", () => {});

            it("returns `timeseries` mode with >=1 aggregations and date breakout", () => {});
            it("returns `timeseries` mode with >=1 aggregations and date + category breakout", () => {});

            it("returns `geo` mode with >=1 aggregations and an address breakout", () => {});

            it("returns `pivot` mode with >=1 aggregations and 1-2 category breakouts", () => {});

            it("returns `default` mode with >=0 aggregations and >=3 breakouts", () => {});
            it("returns `default` mode with >=1 aggregations and >=1 breakouts when first neither date or category", () => {});
        });
        it("with native query question", () => {
            it("returns `NativeMode` for empty query", () => {});
            it("returns `NativeMode` for query with query text", () => {});
        });
        it("with oddly constructed query", () => {
            it("should throw an error", () => {
                // this is not the actual behavior atm (it returns DefaultMode)
            });
        });
    });

    describe("name()", () => {
        it("returns the correct name of current mode", () => {});
    });

    describe("actions()", () => {
        describe("for a new question with Orders table and Raw data aggregation", () => {
            it("returns a correct number of mode actions", () => {
                expect(rawDataQuestionMode.actions().length).toBe(4);
            });
            it("returns 'View this as a table' as mode action 1", () => {
                expect(rawDataQuestionMode.actions()[0].name).toBe(
                    "underlying-data"
                );
                expect(rawDataQuestionMode.actions()[0].icon).toBe("table");
                expect(rawDataQuestionMode.actions()[0].title).toBe(
                    "View this as a table"
                );
            });
            it("returns a defined metric as mode action 2", () => {
                expect(rawDataQuestionMode.actions()[1].name).toBe(
                    "common-metric"
                );
                // TODO: Sameer 6/16/17
                // This is wack and not really testable. We shouldn't be passing around react components in this imo
                // expect(question.actions()[1].title.props.children).toBe("Total Order Value");
            });
            it("returns a count timeseries as mode action 3", () => {
                expect(rawDataQuestionMode.actions()[2].name).toBe(
                    "count-by-time"
                );
                expect(rawDataQuestionMode.actions()[2].icon).toBe("line");
                // TODO: Sameer 6/16/17
                // This is wack and not really testable. We shouldn't be passing around react components in this imo
                // expect(question.actions()[2].title.props.children).toBe("Count of rows by time");
            });
            it("returns summarize as mode action 4", () => {
                expect(rawDataQuestionMode.actions()[3].name).toBe("summarize");
                expect(rawDataQuestionMode.actions()[3].icon).toBe("sum");
                expect(rawDataQuestionMode.actions()[3].title).toBe(
                    "Summarize this segment"
                );
            });
        });

        describe("for a question with an aggregation and a time breakout", () => {
            it("has pivot as mode actions 1 and 2", () => {
                expect(timeBreakoutQuestionMode.actions().length).toBe(3);
                expect(timeBreakoutQuestionMode.actions()[0].name).toBe(
                    "pivot-by-category"
                );
                expect(timeBreakoutQuestionMode.actions()[1].name).toBe(
                    "pivot-by-location"
                );
            });
        });
    });

    describe("actionsForClick()", () => {
        // this is action-specific so just rudimentary tests here showing that the actionsForClick logic works
        // Action-specific tests would optimally be in their respective test files
    });
});
