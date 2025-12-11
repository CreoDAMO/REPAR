package keeper

import (
	"context"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"

	"github.com/CreoDAMO/REPAR/aequitas/x/adns/types"
)

type queryServer struct {
	Keeper Keeper
}

// NewQueryServerImpl returns an implementation of the QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

// Resolve handles DNS resolution queries
func (q queryServer) Resolve(goCtx context.Context, req *types.QueryResolveRequest) (*types.QueryResolveResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	record, err := q.Keeper.GetDNSRecord(ctx, req.Domain)
	if err != nil {
		return nil, err
	}

	// Filter by record type if specified
	if req.RecordType != "" && record.RecordType != req.RecordType {
		return nil, types.ErrDomainNotFound.Wrapf("no %s record for %s", req.RecordType, req.Domain)
	}

	cachedUntil := time.Now().Add(time.Duration(record.Ttl) * time.Second).Unix()

	return &types.QueryResolveResponse{
		Record:          record,
		CachedUntil:     cachedUntil,
		ResolutionLayer: "blockchain_authority",
	}, nil
}

// GetRecord retrieves a single DNS record
func (q queryServer) GetRecord(goCtx context.Context, req *types.QueryGetRecordRequest) (*types.QueryGetRecordResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	record, err := q.Keeper.GetDNSRecord(ctx, req.Domain)
	if err != nil {
		return nil, err
	}

	nft, _ := q.Keeper.NFTs.Get(ctx, req.Domain)

	return &types.QueryGetRecordResponse{
		Record: record,
		Nft:    &nft,
	}, nil
}

// ListDomains lists all domains with optional filtering
func (q queryServer) ListDomains(goCtx context.Context, req *types.QueryListDomainsRequest) (*types.QueryListDomainsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	records, err := q.Keeper.ListRecords(ctx, req.Category, req.FrozenOnly)
	if err != nil {
		return nil, err
	}

	// Apply pagination
	var paginatedRecords []types.DNSRecord
	start := 0
	limit := 100

	if req.Pagination != nil {
		if req.Pagination.Offset > 0 {
			start = int(req.Pagination.Offset)
		}
		if req.Pagination.Limit > 0 {
			limit = int(req.Pagination.Limit)
		}
	}

	end := start + limit
	if end > len(records) {
		end = len(records)
	}
	if start < len(records) {
		paginatedRecords = records[start:end]
	}

	return &types.QueryListDomainsResponse{
		Records: paginatedRecords,
		Pagination: &query.PageResponse{
			Total: uint64(len(records)),
		},
	}, nil
}

// FHEStatus returns the FHE encryption status
func (q queryServer) FHEStatus(goCtx context.Context, req *types.QueryFHEStatusRequest) (*types.QueryFHEStatusResponse, error) {
	status := q.Keeper.GetFHEStatus()
	return &types.QueryFHEStatusResponse{
		Status: &status,
	}, nil
}

// MLDSAStatus returns the ML-DSA signature status
func (q queryServer) MLDSAStatus(goCtx context.Context, req *types.QueryMLDSAStatusRequest) (*types.QueryMLDSAStatusResponse, error) {
	status := q.Keeper.GetMLDSAStatus()
	return &types.QueryMLDSAStatusResponse{
		Status: &status,
	}, nil
}

// Params returns module parameters
func (q queryServer) Params(goCtx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	return &types.QueryParamsResponse{
		Params: types.Params{
			DefaultTtl:         300,
			FheEnabled:         true,
			MldsaEnabled:       true,
			MldsaMode:          "Dilithium87",
			SovereignTlds:      types.SovereignTLDs,
			MaxAxiomViolations: 0,
		},
	}, nil
}

// ValidateAxioms validates a domain against constitutional axioms
func (q queryServer) ValidateAxioms(goCtx context.Context, req *types.QueryValidateAxiomsRequest) (*types.QueryValidateAxiomsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	record, err := q.Keeper.GetDNSRecord(ctx, req.Domain)
	if err != nil {
		return nil, err
	}

	validations, err := q.Keeper.ValidateAgainstAxioms(ctx, *record)
	if err != nil {
		return nil, err
	}

	valid := true
	for _, v := range validations {
		if !v.Passed {
			valid = false
			break
		}
	}

	return &types.QueryValidateAxiomsResponse{
		Valid:       valid,
		Validations: validations,
	}, nil
}
