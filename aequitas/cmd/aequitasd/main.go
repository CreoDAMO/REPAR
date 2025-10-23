package main

import (
	"fmt"
	"os"

	"github.com/cosmos/cosmos-sdk/server"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"
	
	"github.com/CreoDAMO/REPAR/aequitas/app"
)

func main() {
	rootCmd := &cobra.Command{
		Use:   "aequitasd",
		Short: "Aequitas Zone Blockchain Daemon",
		Long:  "Aequitas Zone - $REPAR Reparations Enforcement Blockchain",
	}

	rootCmd.AddCommand(
		server.StatusCommand(),
		server.ShowNodeIDCmd(),
		server.ShowValidatorCmd(),
		server.ShowAddressCmd(),
		server.VersionCmd(),
	)

	if err := svrcmd.Execute(rootCmd, "", app.DefaultNodeHome); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
