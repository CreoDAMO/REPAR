
import json

def load_parameters(filepath):
    """Loads financial parameters from a JSON file."""
    with open(filepath, 'r') as f:
        return json.load(f)

def format_currency(value):
    """Formats a number as a currency string."""
    if value >= 1_000_000_000_000:
        return f"${value / 1_000_000_000_000:.2f}T"
    elif value >= 1_000_000_000:
        return f"${value / 1_000_000_000:.2f}B"
    elif value >= 1_000_000:
        return f"${value / 1_000_000:.2f}M"
    else:
        return f"${value:,.2f}"

def calculate_equity_and_valuation(investment, valuation, parameters):
    """Calculates equity percentage and post-money valuation."""
    equity_percent = (investment / valuation) * 100
    post_money_valuation = valuation + investment
    return equity_percent, post_money_valuation

def calculate_justice_burn_impact(settlement_amount, parameters):
    """Calculates the supply reduction based on settlement amount and justice burn mechanism."""
    # Simplified for demonstration, actual logic might involve more complex interpolation
    # or a continuous function based on the provided data points.
    if settlement_amount >= 1_000_000_000_000: # 1T
        return parameters['justice_burn_mechanisms']['1t_settlement_supply_reduction_percent']
    elif settlement_amount >= 50_000_000_000: # 50B
        return parameters['justice_burn_mechanisms']['50b_settlement_supply_reduction_percent']
    elif settlement_amount >= 1_000_000_000: # 1B
        return parameters['justice_burn_mechanisms']['1b_settlement_supply_reduction_percent']
    else:
        return 0.0 # No significant burn for smaller amounts

def display_main_menu():
    """Displays the main menu options to the user."""
    print("\n--- Aequitas Protocol Financial Calculator (Updated) ---")
    print("1. View Current Financial Architecture & Use of Funds")
    print("2. Explore Updated Return Projections (Sensitivity Analysis)")
    print("3. Calculate Custom Investment Scenario")
    print("4. Simulate Justice Burn Impact")
    print("5. Exit")

def main():
    parameters = load_parameters('aequitas_financial_parameters.json')

    while True:
        display_main_menu()
        choice = input("Enter your choice: ")

        if choice == '1':
            print("\n--- Current Financial Architecture & Use of Funds ---")
            print(f"Core Infrastructure Value: {format_currency(parameters['development_cost_core'])}")
            print(f"Bonus Tools Value: {format_currency(parameters['development_cost_bonus'])}")
            print(f"Pre-Launch Valuation: {format_currency(parameters['pre_launch_valuation'])}")
            print(f"Seed Raise: {format_currency(parameters['seed_raise'])}")
            print(f"Equity at Seed Raise: {parameters['equity_at_seed_raise_percent']:.3f}%")
            post_money_val = parameters['pre_launch_valuation'] + parameters['seed_raise']
            print(f"Post-Money Valuation: {format_currency(post_money_val)}")
            print("\nWhat $22M Actually Buys (Use of Funds):")
            total_use_of_funds = sum(parameters['use_of_funds_new'].values())
            for category, amount in parameters['use_of_funds_new'].items():
                percent = (amount / total_use_of_funds) * 100 if total_use_of_funds else 0
                print(f"  - {category.replace('_', ' ').title()}: {format_currency(amount)} ({percent:.1f}%) ")

        elif choice == '2':
            print("\n--- Updated Return Projections (Sensitivity Analysis) ---")
            print(f"Scenario: You invest {format_currency(parameters['seed_raise'])} today for {parameters['equity_at_seed_raise_percent']:.3f}% equity")
            print("\nCollection Rate | Amount Recovered | Year 3 Valuation | Your Share     | Return Multiple")
            print("----------------|------------------|------------------|----------------|-----------------")
            for scenario, data in parameters['return_projections_new'].items():
                print(f"{data['collection_rate'] * 100:.2f}%          | {format_currency(data['amount_recovered']):<16} | {format_currency(data['year_3_valuation']):<16} | {format_currency(data['investor_share']):<14} | {data['return_multiple']:<15}x")
            print("\nKey Insight: Even in the WORST case (0.01% recovery), you still get 14x returns. That's because the infrastructure is DONE - your $22M isn't at risk.")

        elif choice == '3':
            print("\n--- Custom Investment Scenario ---")
            try:
                custom_investment = float(input("Enter custom investment amount (e.g., 22000000 for $22M): "))
                custom_valuation = float(input("Enter pre-money valuation (e.g., 7000000000 for $7B): "))

                equity_p, post_money_v = calculate_equity_and_valuation(custom_investment, custom_valuation, parameters)
                print(f"\nCustom Investment: {format_currency(custom_investment)}")
                print(f"Pre-Money Valuation: {format_currency(custom_valuation)}")
                print(f"Calculated Equity: {equity_p:.3f}%")
                print(f"Post-Money Valuation: {format_currency(post_money_v)}")

                # Calculate implied valuation per dollar
                if custom_investment > 0:
                    implied_valuation_per_dollar = custom_valuation / custom_investment
                    print(f"Each invested $1 represents {format_currency(implied_valuation_per_dollar)} in protocol book value.")

            except ValueError:
                print("Invalid input. Please enter numeric values.")

        elif choice == '4':
            print("\n--- Simulate Justice Burn Impact ---")
            try:
                settlement_input = float(input("Enter a hypothetical settlement amount (e.g., 1000000000 for $1B): "))
                supply_reduction = calculate_justice_burn_impact(settlement_input, parameters)
                print(f"\nHypothetical Settlement: {format_currency(settlement_input)}")
                print(f"Estimated REPAR supply reduction: {supply_reduction:.3f}%")
            except ValueError:
                print("Invalid input. Please enter a numeric value.")

        elif choice == '5':
            print("Exiting calculator. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()

