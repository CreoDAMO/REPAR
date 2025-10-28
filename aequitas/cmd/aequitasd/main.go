package main

import (
        "os"

        svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"

        "github.com/CreoDAMO/REPAR/aequitas/app"
        "github.com/CreoDAMO/REPAR/aequitas/cmd/aequitasd/cmd"
)

func main() {
        rootCmd := cmd.NewRootCmd()

        if err := svrcmd.Execute(rootCmd, app.Name, app.DefaultNodeHome); err != nil {
                os.Exit(1)
        }
}
